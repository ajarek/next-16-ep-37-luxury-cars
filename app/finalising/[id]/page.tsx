import React from "react"

const FinalizingPage =async ({params}:{params: Promise<{id: string}>}) => {
    const {id} = await params;
  return <div>FinalizingPage {id}</div>
}

export default FinalizingPage
