function LoginView() {
  this.ViewName = 'LoginView';
  this.ApiService = 'User';

  this.InitView = function () {
    $('#btnLogin').click(function () {
      var view = new LoginView();
      view.Login();
    });

    $('#btnBack').click(function () {
      window.location.href = '/';
    });

    // Check for stored credentials on page load
    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      $('#txtEmail').val(storedEmail);
      $('#txtPassword').val(storedPassword);
      this.Login();
    }
  };

  //   this.Login = function () {
  //     var email = $('#txtEmail').val();
  //     var password = $('#txtPassword').val();
  //     var newpassword = $('#txtNewPassword').val();

  //     if (email === '' || password === '' || newpassword === '') {
  //       if (email === '') {
  //         $('#error-messageEmail').html('Email is required');
  //         $('#error-messageEmail').show();
  //       } else {
  //         $('#error-messageEmail').hide();
  //       }
  //       if (password === '') {
  //         $('#error-messagePass').html('Password is required');
  //         $('#error-messagePass').show();
  //       } else {
  //         $('#error-messagePass').hide();
  //       }
  //       if (newpassword === '') {
  //         $('#error-messageNewPass').html('The New Password is required');
  //         $('#error-messageNewPass').show();
  //       } else {
  //         $('#error-messageNewPass').hide();
  //       }
  //     } else {
  //       //   var view = new LoginView();
  //       //   var ctrlActions = new ControlActions();

  //       //   var serviceUser = view.ApiService + '/getUserByEmail';
  //       //   var urlUser = `${serviceUser}?email=${email}`;

  //       //   var userId = ctrlActions.GetToApi(urlUser, function (result) {
  //       //     console.log(result.response.id);
  //       //   });

  //       //   console.log(userId);

  //       //   var servicePassword = 'Password/getLastFivePasswordsByUser';
  //       //   var urlPassword = `${servicePassword}?id=${userId}`;

  //       //   var lastFivePasswords = ctrlActions.GetToApi(
  //       //     urlPassword,
  //       //     function (result) {
  //       //       console.log(result.response);
  //       //     }
  //       //   );

  //       //   console.log(lastFivePasswords);

  //       //   var serviceEncryptPassword = 'Password/getEncryptedPassword';
  //       //   var urlEncryptPassword = `${serviceEncryptPassword}?password=${password}`;

  //       //   var encryptedPassword = ctrlActions.GetToApi(
  //       //     urlEncryptPassword,
  //       //     function (result) {
  //       //       console.log(result.response);
  //       //     }
  //       //   );

  //       //   console.log(encryptedPassword);

  //       var view = new LoginView();
  //       var ctrlActions = new ControlActions();

  //       var serviceUser = view.ApiService + '/getUserByEmail';
  //       var urlUser = `${serviceUser}?email=${email}`;

  //       var getUserId = new Promise(function (resolve, reject) {
  //         ctrlActions.GetToApi(
  //           urlUser,
  //           function (result) {
  //             resolve(result.response.id);
  //           },
  //           function (error) {
  //             reject(error);
  //           }
  //         );
  //       });

  //       getUserId
  //         .then(function (userId) {
  //           console.log(userId);

  //           var servicePassword = 'Password/getLastFivePasswordsByUser';
  //           var urlPassword = `${servicePassword}?id=${userId}`;

  //           var getLastFivePasswords = new Promise(function (resolve, reject) {
  //             ctrlActions.GetToApi(
  //               urlPassword,
  //               function (result) {
  //                 resolve(result.response);
  //               },
  //               function (error) {
  //                 reject(error);
  //               }
  //             );
  //           });

  //           getLastFivePasswords
  //             .then(function (lastFivePasswords) {
  //               console.log(lastFivePasswords);

  //               var serviceEncryptPassword = 'Password/getEncryptedPassword';
  //               var urlEncryptPassword = `${serviceEncryptPassword}?password=${password}`;

  //               var getEncryptedPassword = new Promise(function (
  //                 resolve,
  //                 reject
  //               ) {
  //                 ctrlActions.GetToApi(
  //                   urlEncryptPassword,
  //                   function (result) {
  //                     resolve(result.response);
  //                   },
  //                   function (error) {
  //                     reject(error);
  //                   }
  //                 );
  //               });

  //               getEncryptedPassword
  //                 .then(function (encryptedPassword) {
  //                   console.log(encryptedPassword);
  //                 })
  //                 .catch(function (error) {
  //                   console.log(error);
  //                 });
  //             })
  //             .catch(function (error) {
  //               console.log(error);
  //             });
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  //       if (!lastFivePasswords.includes(encryptedPassword)) {
  //         var serviceLogin = view.ApiService + '/loginUser';
  //         var url = `${serviceLogin}?email=${email}&password=${password}`;
  //         toastr.options = {
  //           'positionClass': 'toast-top-center',
  //           'showDuration': '100',
  //         };

  //         ctrlActions.GetToApi(url, function (result) {
  //           if (result.status === 400) {
  //             toastr.error('Error', 'Incorrect email or password');
  //           } else {
  //             if (result.response.userStatus === 0) {
  //               view.CreNewPassword();
  //               localStorage.setItem('userId', result.response.id);
  //               localStorage.setItem('email', email);
  //               localStorage.setItem('password', password);
  //               toastr.success('Welcome!', 'Login successful');
  //               toastr.success(
  //                 'Verification successful!',
  //                 'Password has been changed successfully'
  //               );

  //               // Agregar tiempo de espera antes de redireccionar
  //               setTimeout(function () {
  //                 window.location.href = '/';
  //               }, 5000);
  //             } else if (result.response.userStatus === 1) {
  //               toastr.error('Error', 'Your account is suspended');
  //             } else if (result.response.userStatus === 2) {
  //               toastr.error('Error', 'Your account is banned');
  //             } else if (result.response.userStatus === 3) {
  //               toastr.error('Error', 'Your account is deleted');
  //             } else if (result.response.userStatus === 4) {
  //               var creNewPassword = view.CreNewPassword();
  //               if (creNewPassword !== 1) {
  //                 localStorage.setItem('userEmail', email);
  //                 $('#error-messageNewPass').hide();
  //                 toastr.success(
  //                   'Verification successful!',
  //                   'Password has been changed successfully'
  //                 );

  //                 toastr.error('Error', 'Your account is inactive');
  //                 setTimeout(function () {
  //                   window.location.href = '/ValidationAccount';
  //                 }, 3000);
  //               }
  //             }
  //           }
  //         });
  //       } else {
  //         toastr.error(
  //           'Error',
  //           'The password is in the last 5 used. Please use a different password'
  //         );
  //       }
  //     }
  //   };
  this.Login = function () {
    var view = new LoginView();
    var ctrlActions = new ControlActions();

    var email = $('#txtEmail').val();
    var password = $('#txtPassword').val();
    var newpassword = $('#txtNewPassword').val();

    if (email === '' || password === '' || newpassword === '') {
      if (email === '') {
        $('#error-messageEmail').html('Email is required');
        $('#error-messageEmail').show();
      } else {
        $('#error-messageEmail').hide();
      }
      if (password === '') {
        $('#error-messagePass').html('Password is required');
        $('#error-messagePass').show();
      } else {
        $('#error-messagePass').hide();
      }
      if (newpassword === '') {
        $('#error-messageNewPass').html('The New Password is required');
        $('#error-messageNewPass').show();
      } else {
        $('#error-messageNewPass').hide();
      }
    } else {
      var serviceUser = view.ApiService + '/getUserByEmail';
      var urlUser = `${serviceUser}?email=${email}`;

      var getUserId = new Promise(function (resolve, reject) {
        ctrlActions.GetToApi(
          urlUser,
          function (result) {
            resolve(result.response.id);
          },
          function (error) {
            reject(error);
          }
        );
      });

      getUserId
        .then(function (userId) {
          console.log(userId);

          var servicePassword = 'Password/getLastFivePasswordsByUser';
          var urlPassword = `${servicePassword}?id=${userId}`;

          var getLastFivePasswords = new Promise(function (resolve, reject) {
            ctrlActions.GetToApi(
              urlPassword,
              function (result) {
                resolve(result.response);
              },
              function (error) {
                reject(error);
              }
            );
          });

          return Promise.all([getLastFivePasswords, userId]);
        })
        .then(function (results) {
          var lastFivePasswords = results[0];
          var userId = results[1];
          console.log(lastFivePasswords);

          var serviceEncryptPassword = 'Password/getEncryptedPassword';
          var urlEncryptPassword = `${serviceEncryptPassword}?password=${newpassword}`;

          var getEncryptedPassword = new Promise(function (resolve, reject) {
            ctrlActions.GetToApi(
              urlEncryptPassword,
              function (result) {
                resolve(result.response);
              },
              function (error) {
                reject(error);
              }
            );
          });

          return Promise.all([getEncryptedPassword, lastFivePasswords, userId]);
        })
        .then(function (results) {
          var encryptedPassword = results[0];
          var lastFivePasswords = results[1];
          var userId = results[2];

          for (var i = 0; i < lastFivePasswords.length; i++) {
            if (lastFivePasswords[i].password === encryptedPassword) {
              toastr.error(
                'Error',
                'The password is in the last 5 used. Please use a different password'
              );
              return;
            }
          }

          if (!lastFivePasswords.includes(encryptedPassword)) {
            var serviceLogin = view.ApiService + '/loginUser';
            var url = `${serviceLogin}?email=${email}&password=${password}`;
            toastr.options = {
              'positionClass': 'toast-top-center',
              'showDuration': '100',
            };

            var checkLogin = new Promise(function (resolve, reject) {
              ctrlActions.GetToApi(url, function (result) {
                if (result.status === 400) {
                  toastr.error('Error', 'Incorrect email or password');
                  reject('Incorrect email or password');
                } else {
                  if (result.response.userStatus === 0) {
                    view.CreNewPassword();
                    localStorage.setItem('userId', result.response.id);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    toastr.success('Welcome!', 'Login successful');
                    toastr.success(
                      'Verification successful!',
                      'Password has been changed successfully'
                    );
                    // Agregar tiempo de espera antes de redireccionar
                    setTimeout(function () {
                      window.location.href = '/';
                    }, 5000);
                    resolve('Login successful');
                  } else if (result.response.userStatus === 1) {
                    toastr.error('Error', 'Your account is suspended');
                    reject('Account suspended');
                  } else if (result.response.userStatus === 2) {
                    toastr.error('Error', 'Your account is banned');
                    reject('Account banned');
                  } else if (result.response.userStatus === 3) {
                    toastr.error('Error', 'Your account is deleted');
                    reject('Account deleted');
                  } else if (result.response.userStatus === 4) {
                    var creNewPassword = view.CreNewPassword();
                    if (creNewPassword !== 1) {
                      localStorage.setItem('userEmail', email);
                      $('#error-messageNewPass').hide();
                      toastr.success(
                        'Verification successful!',
                        'Password has been changed successfully'
                      );

                      toastr.error('Error', 'Your account is inactive');
                      setTimeout(function () {
                        window.location.href = '/ValidationAccount';
                      }, 3000);
                    }
                    resolve('Account inactive');
                  }
                }
              });
            });

            checkLogin
              .then(function (result) {
                console.log(result);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            toastr.error(
              'Error',
              'The password is in the last 5 used. Please use a different password'
            );
          }
        });
    }
  };

  this.CreNewPassword = function () {
    var email = $('#txtEmail').val();
    var newpassword = $('#txtNewPassword').val();
    var regex =
      /^(?!.*(\w)\1{4})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.*+-¿?!¡])(?!.*\s).{8,}$/;

    //Realizar la logica para enviar los datos al Backend
    var view = new LoginView();
    var ctrlActions = new ControlActions();
    var serviceRecover = view.ApiService + '/availableUser';
    var url = `${serviceRecover}?email=${email}&newpassword=${newpassword}`;
    toastr.options = {
      'positionClass': 'toast-top-center',
      'showDuration': '100',
    };

    var data = {
      email: $('#txtEmail').val(),
      newpassword: $('#txtNewPassword').val(),
    };
    if (!regex.test(newpassword)) {
      $('#error-messageNewPass').html(
        'Password must have at least 8 characters, including special characters, numbers, uppercase and lowercase letters.'
      );
      $('#error-messageNewPass').show();
      return 1;
    } else {
      $('#error-messagePass').hide();
      ctrlActions.PostToAPIv1(url, data, function () {});
    }
  };
}

$(document).ready(function () {
  var view = new LoginView();
  view.InitView();
});
