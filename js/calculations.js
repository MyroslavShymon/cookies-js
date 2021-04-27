calculateButton.onclick = function () {
  let numbers = [];

  if (number1.value.length > 0 && number2.value.length > 0) {
    numbers.push(Number(number1.value));
    numbers.push(Number(number2.value));
    console.log(numbers);
    const resultat = (numbers) => {
      let result = 0;
      if (numbers[1] < 0) {
        result = Math.max(...numbers);
      } else if (numbers[1] >= 0) {
        result = Math.min(...numbers);
      }
      return result;
    };
    console.log(resultat);
    alert("Результат: " + resultat);
  }
};
document.querySelectorAll(".numberOnly").forEach(
  (numberOnly) =>
    (numberOnly.onkeydown = function (e) {
      return !/^[А-Яа-яA-Za-z ]$/.test(e.key);
    })
);

let sum = 0;

for (let i = 2; i <= 4; i++) {
  let y = (Math.sin(i) + Math.pow(i, 4)) / Math.log(i);

  tabulationTable.append(insertRowToTable(i, y.toFixed(3)));

  sum += y;
}
let res = document.createElement("span");
res.innerText = "Сума всіх y: " + sum.toFixed(3);
tabulationTable.append(res);

const a = 1.1728,
  b = 0.6789,
  c = 3.14,
  k = 1;
for (let x = 0.2; x < 3; x += 0.2) {
  let t;
  if (x >= 0 && x < 1.8) {
    t = (Math.sqrt(a * x * x + k) / c) * x + b;
  } else if (x >= 1.8 && x <= 2.75) {
    t = Math.pow(Math.cos(x / b), 2) - Math.pow(a * x, 2);
  } else if (x >= 2.75) {
    t = Math.pow(Math.E, -b / x) / (c * x) + Math.sin(a * x);
  }

  hardTabulationTable.append(insertRowToTable(x.toFixed(1), t.toFixed(3)));
}

function insertRowToTable(x, y) {
  let tRow = document.createElement("tr");
  let xTd = document.createElement("td");
  xTd.innerHTML = x;
  let yTd = document.createElement("td");
  yTd.innerHTML = y;
  tRow.append(xTd);
  tRow.append(yTd);

  return tRow;
}
