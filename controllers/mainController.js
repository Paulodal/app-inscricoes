// IMPORT MODELS HERE

exports.getMain = (req, res, next) => {
    res.render('index', {
      pageTitle: 'Página Inicial',
      path: '/',
    });
  };