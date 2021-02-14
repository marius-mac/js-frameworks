# NFQ Akademijos Frontend projekto pradžia

Instrukcija NFQ Akademijos Frontend projektui, pagrindinių reikalavimų, aplinkos paruošimo ir darbo pradžios aprašymas. Darbo tikslas yra išmokti tinkamai paruošti modernią ir tinkamai veikiančią aplinką efektyviam darbui su projekto UI.

## Reikalavimai
* Kodo redaktorius (pvz. [Atom](https://atom.io/)) arba IDE (pvz. [PHPStorm](https://www.jetbrains.com/phpstorm/))
* Komandinė eilutė (MacOS/Ubuntu Terminal, Windows Bash/[Git Bash](https://git-scm.com/))
* [GitHub](https://github.com/) vartotojo anketa
* Naujausia [Git](https://git-scm.com/) versijavimo sistema **(2.12.0)**
* Naujausias [Node.js](https://nodejs.org/en/) **(v6.10.0 LTS)** ir npm

## Aplinkos paruošimas
* Inicijuojame Git repozitoriją: `git init`
* Sukuriame `.gitignore` failą:

```
# Logs
logs
*.log
npm-debug.log*

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Project specific configuration
.idea

# Dist files
web/assets/
```

* Sukuriame npm projektą: `npm init`
* Instaliuojame Gulp CLI: `npm install gulp-cli -g` (MacOS/Linux gali prireikti `sudo`)
* Instaliuojame Gulp: `npm install gulp --save-dev`
* Instaliuojame `gulp-connect`: `npm install gulp-connect --save-dev`
* Sukuriame `gulpfile.js`:

```javascript
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'web'
    });
});

gulp.task('html', function() {
    gulp.src('./web/*.html');
});

gulp.task('watch', function() {
    gulp.watch(['web/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
```

* Sukuriame `web` direktoriją, o joje `index.html` failą:

```html
<!DOCTYPE html>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <section class="content content--centered">
            <h1 class="content__header">NFQ Akademija</h1>
            <p class="content__description">Pradžių pradžia.</p>
        </section>
    </body>
</html>
```

* Išsaugome pakeitumus Git repozitorijoje:
    * `git add .`
    * `git commit -m "Initial commit"`
    * `git remote add origin {repozitorijos URL}`
    * `git push -u origin master`

## Darbas su CSS/Sass
* Sukuriame `src` direktoriją, joje sukuriame `sass`direktoriją
* `sass`direktorijoje sukuriame `style.scss`failą:

```scss
body {
    font-family: Helvetica;
}

.content {
    margin: 100px;

    &--centered {
        text-align: center;
    }

    &__description {
        color: #999;
    }
}
```

* Instaliuojame `gulp-sass`modulį: `npm install gulp-sass --save-dev`
* Inicijuojame `gulp-sass`modulį `gulpfile.js`faile:

```javascript
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('connect', function() {
    connect.server({
        root: 'web'
    });
});

gulp.task('html', function() {
    gulp.src('./web/*.html')
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/assets'));
});

gulp.task('watch', function() {
    gulp.watch(['./web/*.html'], ['html']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'watch']);
```

* Įterpiame `style.css`failą į `index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="/assets/style.css">
    </head>
    <body>
        <section class="content content--centered">
            <h1 class="content__header">NFQ Akademija</h1>
            <p class="content__description">Pradžių pradžia.</p>
        </section>
    </body>
</html>
```

## Darbas su JavaScript
* Instaliuojame `gulp-concat`modulį: `npm install gulp-concat --save-dev`
* Konfigūruojame `gulpfile.js`failą:

```javascript
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('connect', function() {
    connect.server({
        root: 'web'
    });
});

gulp.task('html', function() {
    gulp.src('./web/*.html')
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/assets'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./web/assets'));
});

gulp.task('watch', function() {
    gulp.watch(['./web/*.html'], ['html']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['connect', 'sass', 'js', 'watch']);
```

* `src` direktorijoje sukuriame `js` direktoriją, o joje `main.js` failą
* Įterpiame `main.js` failą į `index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="/assets/style.css">
    </head>
    <body>
        <section class="content content--centered">
            <h1 class="content__header">NFQ Akademija</h1>
            <p class="content__description">Pradžių pradžia.</p>
        </section>
        <script type="text/javascript" src="/assets/main.js"></script>
    </body>
</html>
```

## Darbas su Bootstrap
* Į `index.html`failą įterpiame `Bootstrap` ir `jQuery` iš CDN. Tai nėra pats geriausias būdas naudoti šią biblioteką, bet kol kas visiškai tinkamas:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/style.css">
    </head>
    <body>
        <section class="content content--centered">
            <h1 class="content__header">NFQ Akademija</h1>
            <p class="content__description">Pradžių pradžia.</p>
        </section>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="/assets/main.js"></script>
    </body>
</html>
```
