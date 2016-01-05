import oHoverable from 'o-hoverable';
import attachFastClick from 'fastclick';
import mainTemplate from '../templates/main.hbs';
import peopleTemplate from '../templates/people.hbs';
import person_item from '../templates/_person_item.hbs';
import person_group from '../templates/_person_group.hbs';

document.addEventListener('DOMContentLoaded', () => {
  // make hover effects work on touch devices
  oHoverable.init();

  // remove the 300ms tap delay on mobile browsers
  attachFastClick(document.body);

  // YOUR CODE HERE!
  var groupNames = [];
  var groups = [];
  var dataset = spreadsheet.data;
  var groupTitles = spreadsheet.groups;
  var credits = spreadsheet.credits;

  // put the dataset into groups and add the corresponding indicators
  dataset.forEach(function (row) {
    if (groupNames.indexOf(row.type) === -1) {
      groupNames.push(row.type);
      groups.push({
        type: row.type,
        person: []
      });
    }
  });

  dataset.forEach(function (row) {
    var groupIndex = groupNames.indexOf(row.type);
    groups[groupIndex].person.push(row);
  });

  // groupTitles.forEach(function (row, index) {
  //   console.log(index)
  //   groups.push({
  //     grouptitle: row.heading
  //   })
  // });

  console.log(groups);
  console.log(groupNames);
  document.querySelector('main').innerHTML = mainTemplate(spreadsheet);

  var peopleHTML = peopleTemplate(groups, {
    partials: {
      person_item,
      person_group
    }
  });
  document.querySelector('.content').innerHTML = peopleHTML;
  document.querySelector('.winner .group-heading').innerHTML = groupTitles[0].value;
  document.querySelector('.runnerup .group-heading').innerHTML = groupTitles[1].value;
  document.querySelector('.previous .group-heading').innerHTML = groupTitles[2].value;
  document.querySelector('.byline').innerHTML = writeCredits(credits);
});
