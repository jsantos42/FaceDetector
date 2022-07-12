// Solve the questions below:

/*=============================================================================*/
/* 1) Create a promise that resolves in 4 seconds and returns "success" string */
/*=============================================================================*/
const promise1 = new Promise((res, rej) => {
  setTimeout(res, 4000, 'success');
  // setTimeout(() => res('success'), 4000); // another way of doing it
})


/*=============================================================================*/
/* 2) Run the above promise and make it console.log "success"                  */
/*=============================================================================*/
promise1.then(res => console.log(res));
//or
promise1.then(console.log); // no idea why this one also works


/*=============================================================================*/
/* 3) Read about Promise.resolve() and Promise.reject(). How can you make the  */
/* above promise shorter with Promise.resolve() and console logging "success"? */
/*=============================================================================*/
const promise2 = Promise.resolve(
    setTimeout(console.log, 4000, 'success')
    // setTimeout(() => console.log('success'), 4000)
);


/*=============================================================================*/
/* 4) Catch this error and console log 'Ooops something went wrong'            */
/*=============================================================================*/
Promise.reject('failed').catch(() => console.log('Ooops something went wrong'))


/*=============================================================================*/
/* 5) Use Promise.all to fetch all of these people from Star Wars (SWAPI) at   */
/* the same time. Console.log the output and make sure it has a catch block    */
/* as well.                                                                    */
/*=============================================================================*/
const urls = [
  'http://swapi.dev/api/people/1',
  'http://swapi.dev/api/people/2',
  'http://swapi.dev/api/people/3',
  'http://swapi.dev/api/people/4'
]

// This is the wrong way, the first then() should be inside the Promise.all
// Promise
//     .all(urls.map(url => fetch(url)))
//     .then(array => array.map(stream => stream.json()))
//     .then(people => people.map(person => console.log(person)))
//     .catch(() => console.log('Error fetching'))

// This is the right way
Promise
    .all(urls.map(url => fetch(url).then(stream => stream.json())))
    .then(people => people.map(person => console.log(person)))
    .catch(() => console.log('Error fetching'))
    .finally(console.log("Even if the fetching doesn't work, output this!"))


/*=============================================================================*/
/* 6) Change one of your urls above to make it incorrect and fail the promise  */
/* does your catch block handle it?                                            */
/*=============================================================================*/
//yes