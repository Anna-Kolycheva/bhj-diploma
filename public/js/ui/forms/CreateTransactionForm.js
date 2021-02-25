/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
    /**
     * Вызывает родительский конструктор и
     * метод renderAccountsList
     * */
    constructor(element) {

        super(element);
        this.renderAccountsList();

    }

    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {

        Account.list(User.current(), (err, response) => {
            if (response.success) {
              console.log(response.data.length);
              let select = this.element.querySelector(`.accounts-select`);
              if (response.data.length === 0) {
                console.log('нет счетов');
                 select.innerHTML = '';
                 select.insertAdjacentHTML('beforeEnd', `<option value="" disabled selected>нет доступных счетов</option>`)
              } else {
                console.log(response.data)
                select.innerHTML = '';
                response.data.forEach((element) => {
                    select.insertAdjacentHTML('beforeEnd', `<option value="${element.id}">${element.name}</option>`)
                })}
            }
        })
    }
    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(options) {

        Transaction.create(options, (err, response) => {
            if (response.success) {
                App.update();

                let contentForm = this.element.querySelectorAll(`.form-control`);
                contentForm.forEach((element) => {
                    element.value = ``;
                })

                App.getModal('newExpense').close();
                App.getModal('newIncome').close();

            }
        })
    }
}