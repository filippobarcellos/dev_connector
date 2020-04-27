import Profile from '../models/Profile';

// @route   POST /profiles
// @desc    Create a profile
// @acess   Private
exports.createProfile = async (req, res) => {
  let { skills } = req.body;
  const { youtube, twitter, facebook, linkedin, instagram } = req.body;

  skills = skills.split(',').map((skill) => skill.trim());

  const social = {};

  social.youtube = youtube;
  social.twitter = twitter;
  social.facebook = facebook;
  social.linkedin = linkedin;
  social.instagram = instagram;

  try {
    const profile = await Profile.create({
      ...req.body,
      skills,
      social,
      user: req.user,
    });

    return res.json(profile);
  } catch (err) {
    res.status(500).json({ err: 'Server Error' });
  }
};

// @route   GET /profiles/:id
// @desc    Get a profile
// @acess   Private
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ err: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    res.status(500).json({ err: 'Server error' });
  }
};

// @route   GET /profiles
// @desc    Get all profiles
// @acess   Private
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    return res.json(profiles);
  } catch (err) {
    res.status(500).json({ err: 'Server Error' });
  }
};
