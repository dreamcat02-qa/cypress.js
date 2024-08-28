import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашел на сайт
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Крестик виден пользователю
    });
        
    it('Проверка на позитивный кейс авторизации', function () {
         cy.get(main_page.email).type(data.login); // Ввел верный логин
         cy.get(main_page.password).type(data.password);// Ввел верный пароль
         cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Увидел текст "Авторизация прошла успешно"
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал кнопку "Забыли пароль"

        cy.get(recovery_password_page.email).type(data.login); // Ввел e-mail для восстановления
        cy.get(recovery_password_page.fogot_pass_btn).click(); // Нажал кнопку "Отправить код"

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Увидел текст "Успешно отправили пароль на e-mail"
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Проверка на негативный кейс авторизации (неверный пароль)', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный логин
        cy.get(main_page.password).type('iLoveqastudio2');// Ввел неверный пароль
        cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Увидел текст "Такого логина или пароля нет"
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Проверка на негативный кейс авторизации (неверный логин)', function () {
        cy.get(main_page.email).type('german@dolniko.ru'); // Ввел неверный логин
        cy.get(main_page.password).type(data.password);// Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Увидел текст "Такого логина или пароля нет"
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Проверка на негативный кейс авторизации (неверный логин)', function () {
        cy.get(main_page.email).type('germandolniko.ru'); // Ввел логин без @
        cy.get(main_page.password).type(data.password);// Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Увидел текст "Нужно исправить проблему валидации"
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввел логин с использованием заглавных букв
        cy.get(main_page.password).type(data.password);// Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал кнопку "Войти"

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Увидел текст "Авторизация прошла успешно"
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })
})
