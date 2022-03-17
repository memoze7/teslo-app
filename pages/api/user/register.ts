import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { UserModel } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, validations } from '../../../utils';

type Data =
  | { message: string }
  | {
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
    }
  }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return registerUser(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { name = '', email = '', password = '' } = req.body as { email: string, password: string, name: string; };

  if (password.length < 6)
    return res.status(400).json({ message: 'La contraseña debe de ser de 6 carcteres' })


  if (name.length < 2)

    return res.status(400).json({ message: 'El nombre debe de ser de 2 caracteres' })


  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: 'Correo no es valido' })

  await db.connect();
  const user = await UserModel.findOne({ email });

  if (user) {
    await db.disconnect()
    return res.status(400).json({ message: 'El correo ya esta en uso' })
  }

  // if (email.)
  const newUser = new UserModel({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name
  })
  try {
    await newUser.save({ validateBeforeSave: true })

  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error en el server' })

  }

  const { _id, role } = newUser;

  const token = jwt.signInToken(_id, email)
  return res.status(200).json({
    token: token,
    user: {
      email, role, name
    }
  })

}
