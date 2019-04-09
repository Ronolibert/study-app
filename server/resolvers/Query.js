const Query = {
  me(parent, args, ctx, info) {
    // if (!ctx.request.userId) {
    //   return null;
    // }
    return ctx.db.query.user(
      {
        where: { id: 'cju7oznfkxgf40b03kzkk1fpn' }
      },
      info
    );
  },
  deck(parent, args, ctx, info) {
    return ctx.db.query.deck(
      {
        where: { id: 'cju9h8ozk7zdb0b03s8sulnh4' }
      },
      info
    );
  },
  decks(parent, args, ctx, info) {
    return ctx.db.query.decks(
      {
        where: { owner: { id: 'cju7oznfkxgf40b03kzkk1fpn' } }
      },
      info
    );
  }
};

module.exports = Query;
