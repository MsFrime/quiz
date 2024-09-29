// Функция для отображения результатов в таблице
function displayResults() {
  // Получаем результаты из sessionStorage
  let results = JSON.parse(sessionStorage.getItem('quizResults')) || [];

  // Получаем таблицу по id
  let table = document.getElementById('resultsTable');

  // Очищаем таблицу (если есть предыдущие результаты)
  table.innerHTML = '';

  // Добавляем заголовки таблицы
  let headerRow = table.insertRow();
  let quizNameHeader = headerRow.insertCell();
  let scoreHeader = headerRow.insertCell();
  quizNameHeader.textContent = 'Название викторины';
  scoreHeader.textContent = 'Счет';

  // Проверяем, есть ли результаты
  if (results.length === 0) {
    let noResultsRow = table.insertRow();
    let noResultsCell = noResultsRow.insertCell();
    noResultsCell.colSpan = 2; // Объединяем ячейки
    noResultsCell.textContent = 'Нет сохраненных результатов.';
    return; // Выходим из функции, если результатов нет
  }

  // Добавляем результаты в таблицу
  results.forEach(result => {
    let row = table.insertRow();
    let quizNameCell = row.insertCell();
    let scoreCell = row.insertCell();
    quizNameCell.textContent = result.quizName;
    scoreCell.textContent = result.score;
  });
}

// Вызываем функцию для отображения результатов при загрузке страницы
window.onload = displayResults;