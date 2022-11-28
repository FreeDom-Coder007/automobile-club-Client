import React from 'react'; 

const Blog = () => {
    return (
<section>
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold dark:text-black">Frequently asked questions</h2>
      <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
              <div class="mb-10">
                  <h3 class="flex text-3xl items-start mb-4 font-medium"> 1 What are the different ways to manage a state in a React application? </h3>
                  <p class="font-medium">The Four Kinds of React State to Manage 1.Local state <br/> 2.Global state <br/> 3.Server state <br/> 4.URL state</p>
              </div>
              <div class="mb-10">                        
                  <h3 class="flex text-3xl items-center mb-4 font-medium"> 2 How does prototypical inheritance work? </h3>
                  <p class="font-medium">The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object</p>
              </div>
              <div class="mb-10">
                  <h3 class="flex text-3xl items-center mb-4 font-medium"> 3 What is a unit test? Why should we write unit tests? </h3>
                  <p class="font-medium">The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p> 
              </div>
              <div class="mb-10">
                  <h3 class="flex text-3xl items-center mb-4 font-medium">4 React vs. Angular vs. Vue?
                  </h3>
                  <p class="font-medium">React is a UI library, Angular is a fully-fledged front-end framework, while Vue. js is a progressive framework. They can be used almost interchangeably to build front-end applications, but they're not 100 percent the same, so it makes sense to compare them and understand their differences</p> 
              </div>
          </div> 
      </div>
  </div>
</section>
    )
}

export default Blog;