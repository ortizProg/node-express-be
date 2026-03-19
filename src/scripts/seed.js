const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const { User, Rol, Permission, HealtCenter, RolPermission } = require('../models/associations');

async function seedDatabase() {
  try {
    console.log('Synchronizing database...');
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS "public";');
    await sequelize.query('SET search_path TO public;');
    // Sync all models (force: true will drop and re-create all tables)
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');

    console.log('Seeding Roles...');
    const roles = await Rol.bulkCreate([
      { nombre: 'Super Admin' },
      { nombre: 'Administrador' },
      { nombre: 'Medico' },
      { nombre: 'Recepcionista' },
      { nombre: 'Paciente' }
    ]);

    console.log('Seeding Permissions...');
    const permissions = await Permission.bulkCreate([
      { nombre: 'ver_usuarios' },
      { nombre: 'crear_usuarios' },
      { nombre: 'editar_usuarios' },
      { nombre: 'eliminar_usuarios' },
      { nombre: 'ver_historias' },
      { nombre: 'crear_historias' }
    ]);

    console.log('Seeding Role Permissions...');
    // Grant all permissions to Super Admin (roles[0])
    for (const perm of permissions) {
      await RolPermission.create({
        rol_id: roles[0].id,
        permiso_id: perm.id
      });
    }

    console.log('Seeding Admin User...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      nombre: 'Super Administrador',
      email: 'admin@demo.com',
      password: hashedPassword,
      rol_id: roles[0].id,
      status: 1
    });

    console.log('Seeding Health Center...');
    await HealtCenter.create({
      nombre: 'Centro Médico Principal',
      descripcion: 'Sede central del sistema',
      administrador_id: admin.id
    });

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database, writing to error.json');
    require('fs').writeFileSync('error.json', JSON.stringify({
      message: error.message,
      name: error.name,
      sql: error.sql,
      parent: error.parent ? error.parent.message : null
    }, null, 2));
    process.exit(1);
  }
}

seedDatabase();
