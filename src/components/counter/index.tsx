"use client"

import { useState } from "react"
import { Button } from "components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <Button variant="outline" size="icon" onClick={decrement} aria-label="Diminuir">
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-12 text-center text-2xl font-bold">{count}</span>

      <Button variant="outline" size="icon" onClick={increment} aria-label="Aumentar">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
