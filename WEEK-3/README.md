---

# WEEK 3

## Topics Covered

* DOM Manipulation
* Events
* Form Handling
* Basic JavaScript Projects
* DOM Traversing
* Dynamic Styling
* Validation

---

## DOM Manipulation

DOM (Document Object Model) allows JavaScript to interact with HTML elements.

### Methods Used

| Method                   | Purpose                        |
| ------------------------ | ------------------------------ |
| getElementById()         | Selects element by id          |
| getElementsByClassName() | Selects elements by class      |
| getElementsByTagName()   | Selects elements by tag        |
| querySelector()          | Selects first matching element |
| querySelectorAll()       | Selects all matching elements  |
| innerHTML                | Changes HTML content           |
| textContent              | Changes text only              |
| style                    | Changes CSS styles             |
| createElement()          | Creates HTML element           |
| appendChild()            | Adds element                   |
| removeChild()            | Removes element                |

### Example

```js
document.getElementById("title").innerHTML = "Hello";
```

---

## Events

Events allow interaction between user and webpage.

### Event Types

| Event     | Purpose                     |
| --------- | --------------------------- |
| click     | Triggered on click          |
| mouseover | Triggered when mouse enters |
| keyup     | Triggered after key release |
| submit    | Triggered on form submit    |
| change    | Triggered on value change   |

### Example

```js
document.getElementById("btn")
.addEventListener("click", ()=>{
   alert("Button Clicked");
});
```

---

## Form Handling & Validation

### Concepts Covered

* Taking user input
* Validating form fields
* Preventing invalid submissions

### Example

```js
function validate(){
   let name = document.getElementById("name").value;

   if(name === ""){
      alert("Name is required");
   }
}
```

---


