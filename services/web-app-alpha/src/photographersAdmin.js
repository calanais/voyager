/*
Copyright [2018] [Matthew B White]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';
require('bulma/css/bulma.css');

// const R = require('rowinia');

// const _ = require('lodash');
// const util = require('util');

const axios = require('axios');
const req = axios.create({
    baseURL: 'http://localhost:8641/'
});
function run(){
    let el = document.getElementById('add-submit-btn');

    // attach anonymous function to click event
    addEvent(el, 'click', async function(){
        let person = {};
        person.displayName = document.getElementById('add-displayName').value;
        person.firstName = document.getElementById('add-firstName').value;
        person.lastName = document.getElementById('add-lastName').value;
        person.email = document.getElementById('add-email').value;
        console.log(person);
        let resp = await req.post('photographers',person);
    });

    el = document.getElementById('list-btn');

    addEvent(el,'click',async function(){
        console.log('list clicked');
        show();
        let resp = await req.get('photographers', {});
        let people = resp.data;
        let table =  document.getElementById('list-table');
        console.log(people);
        // console.log(util.inspect(people));
        for (let p =0; p<people.length; p++){
            let person = people[p];
            let newEl = document.createElement('tr');
            newEl.innerHTML =  `<td>${person.firstName}</td> <td>${person.lastName}</td>`;
            insertAfter(newEl, table);
            console.log(newEl.innerHTML);
        }
        //console.log(people);
    });

}

// R.ready(run);