function buildFilterObject(query) {
    const filter = {};
  
    // Filter by categories (e.g. cafe)
    if (query.category) {
      const categories = query.category.split(',').map(c => c.trim());
      if (categories.length > 0) {
        filter.category = { $in: categories };
      }
    }
  
    // Filter by meals (e.g. breakfast)
    if (query.meals) {
      const meals = query.meals.split(',').map(m => m.trim());
      if (meals.length > 0) {
        filter.meals = { $in: meals };
      }
    }
  
    // Filter by dietary preferences 
    if (query.dietary) {
      const dietary = query.dietary.split(',').map(d => d.trim());
      if (dietary.length > 0) {
        filter.dietary = { $in: dietary };
      }
    }
 // Search by City
    if (query.city) {
        filter.city = query.city.trim(); // exact match
      }

 // Search by Name (partial match, case-insensitive)
      if (query.name) {
        filter.name = { $regex: new RegExp(query.name, 'i') };
      }

      return filter;
  }
  
  module.exports = buildFilterObject;

