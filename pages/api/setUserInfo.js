import nc from 'next-connect';
import User from '../../models/User';
import db from '../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  const user = await User.updateOne({
    email:req.body.email, $set: { 
      age: req.body.age,
      interests: req.body.interests,
      instagram: req.body.instagram,
      whatsapp: req.body.whatsapp,
      snapchat: req.body.snapchat,
      facebook: req.body.facebook,
    }
  });
  await db.disconnect();
  res.send({ message: 'User Updated Successfully' });

});

export default handler;
