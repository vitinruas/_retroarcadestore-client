import React, { useState } from 'react'

// styles
import './Profile.css'
import ProfileImage from './assets/images/profile.png'
import { RiUser3Fill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { FaBirthdayCake } from 'react-icons/fa'

type Props = {}

const Profile = (props: Props) => {
  const [photo, setPhoto] = useState<string | null>(null)
  return (
    <section className="profile">
      <div className="photo" title="Change image?">
        {photo ? <img src="" /> : <img src={ProfileImage} />}
      </div>
      <form className="informations">
        <label>
          <span>Name:</span>
          <RiUser3Fill className="icons" />
          <input type="text" placeholder="Name" />
        </label>
        <label>
          <span>Email:</span>
          <MdEmail className="icons" />
          <input type="email" placeholder="Email" />
        </label>
        <label>
          <span>BirthDay:</span>
          <FaBirthdayCake className="icons" />
          <input type="date" placeholder="BirthDay" />
        </label>
        <button className="btn btn-primary">Salvar</button>
      </form>
    </section>
  )
}

export default Profile
