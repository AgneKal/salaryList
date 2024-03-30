'use strict'

const workerName = document.getElementById('worker_name');
const workerSurname = document.getElementById('worker_surname');
const workerSalary = document.getElementById('worker_salary');

const btnAdd = document.getElementById('btn_add');

const table = document.getElementById('table')
const tableRow = document.getElementById('tb_row');

const tdName = document.getElementById('td_name');
const tdSurname = document.getElementById('td_surname');
const tdSalary = document.getElementById('td_salary');
const tdIsChecked = document.getElementById('td_input_checkbox');


const btnDel = document.getElementById('btn_delete_selected');
const btnDelAll = document.getElementById('btn_delete_all');

const workers = [];
const salaries = [];

const addWorker = () => {
    const name = workerName.value;
    const surname = workerSurname.value;
    const salary = workerSalary.value;
    workers.push({
        name: name,
        surname: surname,
        salary: salary
    });
    salaries.push(workerSalary.value);
    workerName.value = '';
    workerSurname.value = '';
    workerSalary.value = '';
    showWorkers();
    console.log(workers);
    console.log(salaries);
    localStorage.setItem("workers", JSON.stringify(workers))
    localStorage.setItem("salaries", JSON.stringify(salaries))
}

btnAdd.onclick = addWorker;

const showWorkers = () => {
    tdName.innerHTML = '';
    tdSurname.innerHTML = '';
    tdSalary.innerHTML = '';
    tdIsChecked.innerHTML = '';
    workers.forEach((t) => {
        const newWorker = table.insertRow(-1);
        const name = newWorker.insertCell(0)
        const surname = newWorker.insertCell(1)
        const salary = newWorker.insertCell(2)
        const checkbox = newWorker.insertCell(3)
        name.textContent = t.name;
        surname.textContent = t.surname;
        salary.textContent = t.salary;
        table.appendChild(newWorker);
        const inputCheckbox = document.createElement('input');
        inputCheckbox.setAttribute('type', 'checkbox');
        inputCheckbox.id = "check_worker";
        checkbox.id = "td_input_checkbox";
        checkbox.appendChild(inputCheckbox)

    })
}

const deleteSelected = () => {

}

btnDel.onclick = deleteSelected;

const deleteAll = () => {
    const empty = document.createElement("li");
    products = [];
    localStorage.removeItem("products");
    showProducts();
    list.appendChild(empty)
}

btnDelAll.onclick = deleteAll;

const lsWorkers = localStorage.getItem("workers");
const lsSalaries = localStorage.getItem("salaries");