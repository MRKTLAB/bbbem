# BBBEM

## Сборка
- Сборка проекта: make
- Пересборка: make build

## Описание уровней сборки
1. **desktop.bundles** – страничные бандлы (common-bundle, page-bundle)
1. **desktop.libs** – блоки с библиотеками (backbone, underscore, jquery)
1. **desktop.blocks** – BEM-блоки с i-bem API и Yate шаблонами
1. **desktop.mvc** – Backbone: Model, View/Controller, Collection
1. **desktop.widgets** – Приложения: Backbone + i-bem

## Модульность
Все элементы из **desktop.mvc** подключаются и декларируются через модули **Require**

## Зачем нужна BB View?
В случае, если кусок представления еще не существует в DOM, то нам необходимо его вставить, проинициализировать и после использовать.
Так, как доступ к API блока мы можем получить, только после того, как он появится в DOM, то код создания вью (с бем блоком) нужно где-то хранить.

w-obligators-total VS w-bem-obligators-total – тут все ок, Backbone BemView легко заменяется чисто i-bem.js
w-obligators VS w-bem-obligators – а вот тут болт, и i-bem.js не готов к этой задаче

## Концепция SPA
Приложение представляет из себя виджет (BEM блок), который объединяет в себе:

1. Backbone: Model, View/Controller, Collection
1. BEM-блоки с API для взаимодействия с ними из Backbone Controller

### Сценарий работы приложения
1. Объявляем в разметке виджет, который представляет из себя **BEM-блок**
1. Декларируем в **deps** виджета зависимости от **Backbone View/Controller**
    1. Каждый **Backbone View/Controller** знает о своих зависимостях, таких, как:
        1. **BEM-блок** c API (он не привязан к Backbone и может использоваться без него)
        1. **Backbone Model** – конструктор модели
        1. **Backbone Collection** – конструктор коллекции
1. В **i-bem** параметрах виджета прокидываем данные для **Backbone Model** или **Collection**
1. Инициализиурем виджет, в **onSetMode** виджета пишем логику взаимодействия компонентов приложения
    1. Создаем инстансы **Backbone Collection** или **Backbone Model**
    1. Создаем инстансы **Backbone View/Controller** и при необходимости прокидываем туда **Backbone Collection** или **Backbone Model**
1. Двунаправленное взаимодействие **View (DOM)** с **Backbone View/Controller** происходит через API и события **BEM-блока**

### Роутинг
...coming soon...

### Вопросы
1. Шаринг коллекций/моделей между виджетами

## Концепция MPA
...coming soon...
