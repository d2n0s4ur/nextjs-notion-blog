import { NextApiRequest, NextApiResponse } from 'next'

import { SearchParams } from '@texonom/ntypes'

import { search } from '../../lib/notion'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const searchParams: SearchParams = req.body

  console.log('<<< lambda search-notion', searchParams)
  const results = await search(searchParams)
  console.log('>>> lambda search-notion', results)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.status(200).json(results)
}
