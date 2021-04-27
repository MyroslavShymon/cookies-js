import User from './User.js'

registrationForm.style.display = 'block'
tabulationForm.style.display = 'none'
editForm.style.display = 'none'

let validation = false
let user

username.oninput = function () {
	validateUsernameInput(username, usernameSpanErr)
}

email.oninput = function () {
	validateEmailInput(email, emailSpanErr)
}

password.oninput = function () {
	validatePassowdInput(password, passwordSpanErr)
}

editUsername.oninput = function () {
	validateUsernameInput(editUsername, editUsernameSpanErr)
}

editEmail.oninput = function () {
	validateEmailInput(editEmail, editEmailSpanErr)
}

editPassword.oninput = function () {
	validatePassowdInput(editPassword, editPasswordSpanErr)
}

submitButton.onclick = function () {
	if (validation) {
		user = new User(username.value, email.value, password.value)
		setCookie('user', JSON.stringify(user))

		validation = false

		showEdit()
	} else {
		return
	}
}

registrationLink.onclick = function () {
	showReg()
}

tabulationLink.onclick = function () {
	user = JSON.parse(getCookie('user'))
	if (user.email && user.password && user.username) {
		showTab()
	}
}

editLink.onclick = function () {
	user = JSON.parse(getCookie('user'))
	if (user.email && user.password && user.username) {
		showEdit()
	}
}

function showReg () {
	registrationForm.style.display = 'block'
	tabulationForm.style.display = 'none'
	editForm.style.display = 'none'
}

function showTab () {
	registrationForm.style.display = 'none'
	tabulationForm.style.display = 'block'
	editForm.style.display = 'none'
}

function showEdit () {
	registrationForm.style.display = 'none'
	tabulationForm.style.display = 'none'
	editForm.style.display = 'block'

	user = JSON.parse(getCookie('user'))

	editUsername.value = user.username
	editEmail.value = user.email
	editPassword.value = user.password
}

function validateEmail(email) {
	let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return pattern.test(email);
}

function validateEmailInput (input, span) {
	if (input.value.length <= 0) {
		span.textContent = 'Email is required'
		validation = false
	} else if (!validateEmail(input.value)) {
		span.textContent = 'Please enter correct email'
		validation = false
	} else {
		span.textContent = ''
		validation = true
	}
}

function validatePassowdInput (input, span) {
	if (input.value.length < 8) {
		span.textContent = 'Password must be at least 8 characters long'
		validation = false
	} else {
		span.textContent = ''
		validation = true
	}
}

function validateUsernameInput (input, span) {
	if (input.value.length < 3) {
		span.textContent = 'Username must be at least 3 characters long'
		validation = false
	} else {
		span.textContent = ''
		validation = true
	}
}

editButton.onclick = function () {
	if (validation) {
		user.username = editUsername.value
		user.email = editEmail.value
		user.password = editPassword.value

		setCookie('user', JSON.stringify(user))
	} else {
		return
	}
}

logoutButton.onclick = function () {
	if (confirm('Are you sure you want to logout?')) {
		clearFields()
		validation = false

		deleteCookie('user')
		user = new User()

		showReg()
	}
}

function clearFields () {
	editEmail.value = ''
	editPassword.value = ''
	editUsername.value = ''
	email.value = ''
	password.value = ''
	username.value = ''
}

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))

    return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, options = {}) {
	options = {
		...options,
	}

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString()
	}

	let updatedCookie = name + '=' + value

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey
		let optionValue = options[optionKey]
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue
		}
	}

	document.cookie = updatedCookie
}

function deleteCookie (name) {
	setCookie(name, "", {
        'max-age': -1
	})
}

