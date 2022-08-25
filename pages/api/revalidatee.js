export default async function handler(req, res) {
  // if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  res.status(200).json({ name: 'John Doe' });

  // try {
  //   await res.revalidate('/');
  //   const pathToRevalidate = `/${
  //     req.body?.record?.id || req.body?.old_record?.id
  //   }`;
  //   await res.revalidate(pathToRevalidate);
  //   return res.send({ revalidate: true });
  // } catch (error) {
  //   return res.status(500).send('Error revalidating');
  // }


}
