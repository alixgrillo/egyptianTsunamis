'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      category: 'Human Services',
      categoryID: 6,
      iconName: 'fa fa-user',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category: 'Education',
      categoryID: 3,
      iconName: 'fa fa-graduation-cap',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'International',
      categoryID: 7,
      iconName: 'fa fa-globe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Human and Civil Rights',
      categoryID: 8,
      iconName: 'fa fa-users',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Religion',
      categoryID: 9,
      iconName: 'fa fa-link',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Animals',
      categoryID: 1,
      iconName: 'fa fa-paw',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Arts, Culture, Humanities',
      categoryID: 2,
      iconName: 'fa fa-paint-brush',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Environment',
      categoryID: 4,
      iconName: 'fa fa-tree',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Health',
      categoryID: 5,
      iconName: 'fa fa-stethoscope',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Community Development',
      categoryID: 10,
      iconName: 'fa fa-home',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      category: 'Research and Public Policy',
      categoryID: 11,
      iconName: 'fa fa-wheelchair',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
