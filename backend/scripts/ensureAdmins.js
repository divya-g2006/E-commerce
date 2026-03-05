import User from '../models/User.js';

const ADMIN_EMAILS = ['gd623559@gmail.com', 'divya.g2023it@sece.ac.in'];
const DEFAULT_ADMIN_PASSWORD = '12072006';

const ensureAdminUser = async ({ email }) => {
  const existing = await User.findOne({
    $or: [{ seedEmail: email }, { email }],
  });

  if (!existing) {
    const admin = new User({
      name: 'Admin',
      email,
      password: DEFAULT_ADMIN_PASSWORD,
      role: 'admin',
      seedEmail: email,
      isSeededAdmin: true,
    });
    await admin.save();
    console.log(`Seeded admin: ${email}`);
    return;
  }

  let changed = false;

  if (existing.seedEmail !== email) {
    existing.seedEmail = email;
    changed = true;
  }

  if (existing.isSeededAdmin !== true) {
    existing.isSeededAdmin = true;
    changed = true;
  }

  if (existing.role !== 'admin') {
    existing.role = 'admin';
    changed = true;
  }

  if (changed) {
    await existing.save();
    console.log(`Ensured admin: ${email}`);
  }
};

export const ensureAdmins = async () => {
  await Promise.all(ADMIN_EMAILS.map((email) => ensureAdminUser({ email })));
};

export const adminSeedConfig = {
  ADMIN_EMAILS,
  DEFAULT_ADMIN_PASSWORD,
};
