const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * Custom Login endpoint
 * Accepts email and password in payload
 */
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get('users').find({ email, password }).value();

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

/**
 * Custom Signup endpoint
 * Accepts user details in payload
 */
server.post('/signup', (req, res) => {
  const { email, password, displayName, avatarUrl } = req.body;
  
  const existingUser = router.db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    displayName,
    avatarUrl: avatarUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 70)}/200/200`
  };

  router.db.get('users').push(newUser).write();
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

