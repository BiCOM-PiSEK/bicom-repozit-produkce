// functions/api/_cron-worker.js
// Cloudflare Worker Cron Router
// Routes cron events to the respective daily/weekly background tasks.

import cronBackup from './_cron-backup.js';
import cronCashflow from './_cron-cashflow.js';
import cronGdpr from './_cron-gdpr.js';
import cronGeo from './_cron-geo.js';
import cronInstagram from './_cron-instagram.js';
import cronReminders from './_cron-reminders.js';
import cronSocial from './_cron-social.js';

export default {
  async scheduled(event, env, ctx) {
    console.log(`[cron-worker] Triggered by schedule: ${event.cron}`);

    switch (event.cron) {
      case "0 */1 * * *": // reminders-dispatch (every hour)
        ctx.waitUntil(cronReminders.scheduled(event, env, ctx));
        break;
      case "0 3 * * *": // instagram-sync (daily at 03:00)
        ctx.waitUntil(cronInstagram.scheduled(event, env, ctx));
        break;
      case "30 3 * * *": // gdpr-anonymize (daily at 03:30)
        ctx.waitUntil(cronGdpr.scheduled(event, env, ctx));
        break;
      case "0 4 * * MON": // geo-insights (weekly on Mondays at 04:00)
        ctx.waitUntil(cronGeo.scheduled(event, env, ctx));
        break;
      case "0 2 * * SUN": // d1-backup (weekly on Sundays at 02:00)
        ctx.waitUntil(cronBackup.scheduled(event, env, ctx));
        break;
      case "0 8 * * *": // social-publish (daily at 08:00)
        ctx.waitUntil(cronSocial.scheduled(event, env, ctx));
        break;
      case "0 9 * * MON": // cashflow-alerts (weekly on Mondays at 09:00)
        ctx.waitUntil(cronCashflow.scheduled(event, env, ctx));
        break;
      default:
        console.warn(`[cron-worker] No handler registered for schedule: ${event.cron}`);
    }
  }
};
