import Post from '../models/Post';

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      text: req.body.text,
      user: req.user,
    });

    const post = await newPost.save();

    return res.json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: 'Server Error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', ['name', 'avatar'])
      .sort({ date: -1 });

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('user', ['name', 'avatar']);

    if (!post) {
      return res.status(404).json({ err: 'Post not found' });
    }

    return res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ err: 'Post not found' });
    }
    return res.status(500).json({ err: 'Server Error' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (post.user.toString() !== req.user) {
      return res.status(401).json({ err: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};

exports.createLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user).length > 0
    ) {
      return res.status(400).json({ err: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user });

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user).length ===
      0
    ) {
      return res.status(400).json({ err: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
