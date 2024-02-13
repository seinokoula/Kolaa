'use client';

import { useState } from "react";
import Profile from "../components/FormProfile";
import InfoProfile from "../components/InfoProfile";

export default function Example() {
const [displayForm, setDisplayForm] = useState<boolean>(false);

return (
    <div className=''>
      {!displayForm && <Profile />}
      <InfoProfile onProfileNotFound={() => setDisplayForm(true)} />
    </div>
  );
}
