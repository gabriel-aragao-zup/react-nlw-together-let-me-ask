import { User } from 'firebase/auth';
export type Profile = {
  uid: string;
  name: string;
  photoURL: string;
}

export function lmaUserFromFirebaseUser(user: User) : Profile {
  const lmaUid = user.uid;
  let lmaName;
  let lmaPhotoURL;
  
  if(user.displayName){
    lmaName = user.displayName;
  } else {
    lmaName = `User ${lmaUid}`
  }
  
  if(user.photoURL){
    lmaPhotoURL = user.photoURL;
  } else {
    let initial = lmaName.charAt(0)
    lmaPhotoURL = `https://dummyimage.com/400x400/aaa/fff.jpg&text=${initial}`
  }

  return {
            uid : lmaUid,
            name: lmaName,
            photoURL : lmaPhotoURL
          };
}

