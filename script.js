'use strict'

const workerName = document.getElementById('worker_name');
const workerSurname = document.getElementById('worker_surname');
const workerSalary = document.getElementById('worker_salary');

const btnAdd = document.getElementById('btn_add');

const table = document.getElementById('table');
const tableRow = document.getElementsByClassName('tb_row');
const tdName = document.getElementsByClassName('td_name');
const tdSurname = document.getElementsByClassName('td_surname');
const tdSalary = document.getElementsByClassName('td_salary');
const tdIsChecked = document.getElementsByClassName('td_input_checkbox');

const salarySum = document.getElementById('salary_sum');
const salaryAverage = document.getElementById('salary_average');
salarySum.textContent = 0;
salaryAverage.textContent = 0;


const btnDel = document.getElementById('btn_delete_selected');
const btnDelAll = document.getElementById('btn_delete_all');

let workers = [];
let salaries = [];

const addWorker = () => {
    const name = workerName.value;
    const surname = workerSurname.value;
    const salary = Number(workerSalary.value);
    const worker = {
        name,
        surname,
        salary
    };
    workers.push(worker);
    salaries.push(salary);
    workerName.value = '';
    workerSurname.value = '';
    workerSalary.value = '';
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("salaries", JSON.stringify(salaries));
    addRow(worker);
    statistic();
}

const addRow = (worker) => {
    const newRow = table.insertRow(-1);
    newRow.className = 'tb_row';
    const name = newRow.insertCell(0);
    name.className = 'td_name';
    const surname = newRow.insertCell(1);
    surname.className = 'td_surname';
    const salary = newRow.insertCell(2);
    salary.className = 'td_salary';
    const checkbox = newRow.insertCell(3);
    checkbox.className = 'td_input_checkbox';

    name.textContent = worker.name;
    surname.textContent = worker.surname;
    salary.textContent = worker.salary;
    table.appendChild(newRow);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.className = "check_worker";
    checkbox.appendChild(inputCheckbox);
}

btnAdd.onclick = addWorker;

const showWorkers = () => {
    workers.forEach((t) => {
        addRow(t);
    })
    statistic();
}

const deleteSelected = () => {
    const rows = document.getElementsByClassName('tb_row');
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const isCheck = row.getElementsByClassName('check_worker')[0].checked;
        if (isCheck) {
            workers.splice(i, 1);
            salaries.splice(i, 1);
            row.remove();
        }
    }
    localStorage.setItem("workers", JSON.stringify(workers));
    localStorage.setItem("salaries", JSON.stringify(salaries));
    statistic();
}

btnDel.onclick = deleteSelected;

const deleteAll = () => {
    const rows = document.getElementsByClassName('tb_row');
    while (rows.length > 0) {
        rows[0].remove();
    }
    workers = [];
    salaries = [];
    localStorage.removeItem("workers");
    localStorage.removeItem("salaries");
    salarySum.textContent = 0;
    salaryAverage.textContent = 0;
}

btnDelAll.onclick = deleteAll;

const statistic = () => {
    salarySum.textContent = salaries.reduce((a, s) => a += s, 0);
    const average = ((salaries.reduce((a, s) => a += s, 0)) / salaries.length).toFixed(2);
    salaryAverage.textContent = isNaN(average) ? 0 : average;
}

const lsWorkers = localStorage.getItem("workers");
const lsSalaries = localStorage.getItem("salaries");

if (lsWorkers != null && lsSalaries != null) {
    workers = JSON.parse(lsWorkers);
    salaries = JSON.parse(lsSalaries);
    showWorkers();
}
