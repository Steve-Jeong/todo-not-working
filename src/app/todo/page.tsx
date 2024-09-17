'use client'
import chalk from "chalk"

const Todo = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const title = formData.get('title') as string
    console.log(chalk.bgRed.whiteBright(' formData : '), formData)
    console.log(chalk.bgRed.whiteBright(' title : '), title)

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })  
      if (!res.ok) {
        throw new Error('Failed to create todo')
      }
    } catch (error) {
      throw new Error('Catch : Failed to create todo')
    }
  }

  return (
    <div>
      <div className='text-2xl font-bold'>Todo</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' name='title' placeholder='Add todo' className="border mr-4"/>
          <button type='submit' className="border border-gray-300 px-4 hover:shadow-md hover:border-gray-500">Add todo</button>
        </form>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Todo