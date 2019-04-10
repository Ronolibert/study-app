const Query = {
  me(parent, args, ctx, info) {
    // if (!ctx.request.userId) {
    //   return null;
    // }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  deck(parent, { id }, ctx, info) {
    return ctx.db.query.deck(
      {
        where: { id }
      },
      info
    );
  },
  decks(parent, args, ctx, info) {
    return ctx.db.query.decks(
      {
        where: { owner: { id: ctx.request.userId } }
      },
      info
    );
  }
};

module.exports = Query;
