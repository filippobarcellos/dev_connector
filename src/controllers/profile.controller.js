import Profile from '../models/Profile';
import User from '../models/User';

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
  const { id } = req.params;
  try {
    const profile = await Profile.findOne({
      user: id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ err: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ err: 'Profile not found' });
    }
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

// @route   DELETE /profile
// @desc    Detele profile, user and posts
// @acess   Private
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user });

    await User.findOneAndRemove({ _id: req.user });

    return res.json({ msg: 'User deleted ' });
  } catch (err) {
    res.status(500).json({ err: 'Server Error' });
  }
};

// @route   PUT /profiles/:id/experience
// @desc    Update a profile
// @acess   Private
exports.addExperience = async (req, res) => {
  const { id } = req.params;
  const { title, company, location, from, to, current, description } = req.body;

  const newExperience = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id });
    console.log(profile);
    profile.experience.unshift(newExperience);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};

// @route   DELETE /profiles/:id/experience/:expId
// @desc    Delete a experience
// @acess   Private

exports.deleteExperience = async (req, res) => {
  const { id, expId } = req.params;

  try {
    const profile = await Profile.findOne({ user: id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(expId);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};

exports.addEducation = async (req, res) => {
  const { id } = req.params;
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: id });
    profile.education.unshift(newEducation);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};

// @route   DELETE /profiles/:id/experience/:educId
// @desc    Delete a experience
// @acess   Private

exports.deleteEducation = async (req, res) => {
  const { id, educId } = req.params;

  try {
    const profile = await Profile.findOne({ user: id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(educId);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ err: 'Server Error' });
  }
};
