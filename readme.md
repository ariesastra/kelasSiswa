# Kelas Siswa Backend

## Deskripsi
Aplikasi ini adalah aplikasi backend yang dibuat menggunakan NodeJS, Express, PostgreSQL, Sequelize, untuk proses pemodelan belajar mengajar dalam kelas yang di dalam nya terdapat 1 orang guru / pengajar dan murid.

## Skema Database
![Schema database](schema.png)

## Instalasi
- Aplikasi ini menggunakan NodeJS dan Node Package Manager (NPM), untuk proses instalasi, lakukan pengetikan kode `npm i` pada terminal.
- Pastikan di local anda menggunakan `database PostgreSQL`, atau jika belum Anda dapat menginstallnya pada tautan berikut 
[URL](https://www.postgresql.org).
- Setelah dipastikan Anda memiliki DB PostgreSQL, ganti `database user development` pada folder `config -> config.json` sesuai dengan kredensial yang sudah Anda install di lokal Anda, lalu lakukan :
```bash
  npx sequelize-cli db:create
  npm run db:dev
````
- Saya sudah membuat `seeder user` agar proses testing lebih cepat, berikut list akun user yang dapat digunakan untuk login dan mendapatkan token: 
```json
{
  email: 'admin@mail.com',
  password: password
},
{
  email: 'pengajar@mail.com',
  password: password
},
{
  email: 'murid1@mail.com',
  password: password
},
{
  email: murid2@mail.com,
  password: password
},
{
  email: murid3@mail.com,
  password: password
}
```
- API endpoint yang saya gunakan untuk aplikasi ini ada di [API Docs](https://documenter.getpostman.com/view/8074442/UVeMGhwX)
