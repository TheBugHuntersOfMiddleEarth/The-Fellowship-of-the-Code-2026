/* Formular überwachen */
document.querySelector("#form").addEventListener("submit", e => {

```
/* Seite nicht neu laden */
e.preventDefault();

/* Eingabewerte lesen */
const item = document.querySelector("#item").value;
const amount = document.querySelector("#amount").value;

/* Neue Inventarzeile erzeugen */
document.querySelector("#inventory").innerHTML += `
    <tr>
        <td>${item}</td>
        <td>${amount}</td>
        <td>Gefährte</td>
    </tr>
`;

/* Formular leeren */
e.target.reset();

/* Rückmeldung */
alert(`💍 ${item} wurde dem Inventar hinzugefügt.`);
```

});
