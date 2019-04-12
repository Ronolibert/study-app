const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mutation = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);

    args.email = args.email.toLowerCase();

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });

    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Incorrect email/password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });

    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async createDeck(parent, { title, description, cards }, ctx, info) {
    const deck = await ctx.db.mutation.createDeck(
      {
        data: {
          owner: {
            connect: {
              id: ctx.request.userId
            }
          },
          title,
          description,
          cards: {
            create: cards
          }
        }
      },
      info
    );

    return deck;
  },
  async deleteDeck(parent, { id }, ctx, info) {
    const deck = await ctx.db.mutation.deleteDeck(
      {
        where: { id }
      },
      info
    );

    return deck;
  },
  async deleteCard(parent, { id }, ctx, info) {
    const card = await ctx.db.mutation.deleteCard(
      {
        where: { id }
      },
      info
    );

    return card;
  }
};

module.exports = Mutation;
