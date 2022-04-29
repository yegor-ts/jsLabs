const form = document.getElementById('form');
const changeDataForm = document.getElementById('resetPasswordForm');
const friendForm = document.getElementById('friendForm');

form.addEventListener('submit', signUpUserHandler);
changeDataForm.addEventListener('submit', changeUserDataHandler);
friendForm.addEventListener('submit', addFriendHandler);
friendForm.addEventListener('reset', removeFriendHandler);

let user;

function signUpUserHandler() {
  event.preventDefault();

  const userPayload = {
    name: form.querySelector('[name="name"]').value,
    email: form.querySelector('[name="email"]').value,
    password: form.querySelector('[name="password"]').value,
    secretQuestion: form.querySelector('[name="secretQuestion"]').value,
    secretQuestionAnswer: form.querySelector('[name="secretQuestionAnswer"]').value,
  };

  user = new User(
    userPayload.name,
    userPayload.email,
    userPayload.password,
    userPayload.secretQuestion,
    userPayload.secretQuestionAnswer
  );

  alert('Користувач створен!');
}

function changeUserDataHandler() {
  event.preventDefault();

  if (user) {
    const newPassword = changeDataForm.querySelector('[name="resetPassword"]').value;
    newPassword ? user.resetPassword(newPassword) : null;

    const newName = changeDataForm.querySelector('[name="changeName"]').value;
    newName ? user.changeName(newName) : null;

    const newEmail = changeDataForm.querySelector('[name="changeEmail"]').value;
    newEmail ? user.changeEmail(newEmail) : null;

    console.log(user);
  } else {
    alert('Користувач ще не створений!');
  }
}

function addFriendHandler() {
  event.preventDefault();
  if (user) {
    const friendEmail = friendForm.querySelector('[name="friendEmail"]').value;
    user.addFriend(friendEmail);

    console.log(user);
  } else {
    alert('Користувач ще не створений!');
  }
}

function removeFriendHandler() {
  event.preventDefault();
  if (user) {
    const friendEmail = friendForm.querySelector('[name="friendEmail"]').value;
    user.removeFriend(friendEmail);

    console.log(user);
  } else {
    alert('Користувач ще не створений!');
  }
}

const User = function (name, email, password, secretQuestion, secretQuestionAnswer) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.friends = [];
  this.secretQuestion = secretQuestion;
  this.secretQuestionAnswer = secretQuestionAnswer;

  this.validateSecretQuestionAnswer = () => {
    const answer = prompt(`${this.secretQuestion}`);
    if (answer !== this.secretQuestionAnswer) {
      alert('Неправильна відповідь!')
      return false;
    }
    return true;
  }

  this.checkIfFriendInList = (friendEmail) => {
    return this.friends.includes(friendEmail);
  }

  this.resetPassword = (newPassword) => {
    const canResetPassword = this.validateSecretQuestionAnswer();
    if (canResetPassword) this.password = newPassword;
  }

  this.changeName = (newName) => {
    const canChangeName = this.validateSecretQuestionAnswer();
    if (canChangeName) this.name = newName;
  }

  this.changeEmail = (newEmail) => {
    const canChangeEmail = this.validateSecretQuestionAnswer();
    if (canChangeEmail) this.email = newEmail;
  }

  this.addFriend = (friendEmail) => {
    const cannotAdd = this.checkIfFriendInList(friendEmail);
    !cannotAdd ? this.friends.push(friendEmail) : alert('Користувач уже у вас у друзях');
  }

  this.removeFriend = (friendEmail) => {
    const cannotAdd = this.checkIfFriendInList(friendEmail);
    if (cannotAdd) {
      const index = this.friends.indexOf(friendEmail);
      this.friends.splice(index, 1);
    } else {
      alert('Користувача немає у вас у друзях!');
    }
  }
};