'use strict'

const workerName = document.getElementById('worker_name');
const workerSurname = document.getElementById('worker_surname');
const workerSalary = document.getElementById('worker_salary');

const btnAdd = document.getElementById('btn_add');

const table = document.getElementById('table')
const tableRow = document.getElementsByClassName('tb_row');

const tdName = document.getElementsByClassName('td_name');
const tdSurname = document.getElementsByClassName('td_surname');
const tdSalary = document.getElementsByClassName('td_salary');
const tdIsChecked = document.getElementsByClassName('td_input_checkbox');

console.log(tableRow);

const btnDel = document.getElementById('btn_delete_selected');
const btnDelAll = document.getElementById('btn_delete_all');

let workers = [];
let salaries = [];

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
    //tableRow.remove();
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
        checkbox.class = "td_input_checkbox";
        checkbox.appendChild(inputCheckbox)

    })
}

const deleteSelected = () => {

}

btnDel.onclick = deleteSelected;

const deleteAll = () => {
    workers = [];
    salaries = [];
    const empty = table.insertRow(-1);
    const name = empty.insertCell(0)
    const surname = empty.insertCell(1)
    const salary = empty.insertCell(2)
    const checkbox = empty.insertCell(3)
    localStorage.removeItem("workers");
    localStorage.removeItem("salaries");
    showWorkers();
    table.appendChild(empty);
}

btnDelAll.onclick = deleteAll;

const lsWorkers = localStorage.getItem("workers");
const lsSalaries = localStorage.getItem("salaries");

if (lsWorkers != null && lsSalaries != null) {
    workers = JSON.parse(lsWorkers);
    salaries = JSON.parse(lsSalaries);
    showWorkers();
}