#!/usr/bin/env node
/**
 * Aggregate reports.json into per-city waiting time statistics.
 * Writes output to data/waiting-times.json.
 *
 * Usage: node scripts/update-waiting-times.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');
const OUTPUT_FILE = path.join(DATA_DIR, 'waiting-times.json');

function aggregateByCity(reports) {
  const byCity = {};

  for (const report of reports) {
    const city = (report.city || 'unknown').toLowerCase();
    if (!byCity[city]) {
      byCity[city] = {
        city,
        totalWaitDays: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
        rescheduled: 0,
        count: 0,
      };
    }
    const entry = byCity[city];
    entry.count += 1;
    entry.totalWaitDays += typeof report.waitDays === 'number' ? report.waitDays : 0;

    switch (report.outcome) {
      case 'approved':   entry.approved += 1;    break;
      case 'rejected':   entry.rejected += 1;    break;
      case 'rescheduled': entry.rescheduled += 1; break;
      default:           entry.pending += 1;     break;
    }
  }

  return Object.values(byCity)
    .map((d) => ({
      city: d.city,
      reportCount: d.count,
      avgWaitDays: d.count > 0 ? Math.round(d.totalWaitDays / d.count) : 0,
      approvalRate: d.count > 0 ? Math.round((d.approved / d.count) * 100) : 0,
      rejectionRate: d.count > 0 ? Math.round((d.rejected / d.count) * 100) : 0,
      pendingCount: d.pending,
      rescheduledCount: d.rescheduled,
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
    .sort((a, b) => b.reportCount - a.reportCount);
}

function main() {
  if (!fs.existsSync(REPORTS_FILE)) {
    console.error(`Error: ${REPORTS_FILE} not found`);
    process.exit(1);
  }

  const raw = fs.readFileSync(REPORTS_FILE, 'utf8');
  const reports = JSON.parse(raw);

  if (!Array.isArray(reports)) {
    console.error('Error: reports.json must be a JSON array');
    process.exit(1);
  }

  const result = aggregateByCity(reports);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');

  console.log(`✓ Wrote waiting times for ${result.length} cities → data/waiting-times.json`);
  for (const city of result) {
    console.log(
      `  ${city.city.padEnd(12)} avg ${String(city.avgWaitDays).padStart(3)} days  ` +
        `${city.approvalRate}% approved  (${city.reportCount} reports)`
    );
  }
}

main();
