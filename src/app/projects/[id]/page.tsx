"use client"

import { useParams } from 'next/navigation'

export default function ProjectPage() {
  const params = useParams<{id: string}>()
  return <div>hello! this is the page for the project with id {params.id}</div>;
}
