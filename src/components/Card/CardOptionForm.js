import React, { useState } from 'react';

const CardOptionForm = ({closeModal, updateBoard}) => {
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [sequence, setSequence] = useState('');
  const [includeCoffee, setIncludeCoffee] = useState(false)
  return (
    <form type="submit">
      <div className="card-form-wrapper">
        <div>
          <label>Number of cards for the board: </label>
          <input
            autoFocus
            type='number'
            value={numberOfCards}
            name="numberOfCards"
            onChange={(e) => { setNumberOfCards(e.target.value); }}
          />
        </div>
        <div>
          <p>What sequence would you like?</p>
          <label>Sequencial</label>
          <input
            type='radio'
            id="sequencial"
            name="sequence"
            value={"seq"}
            checked={sequence === "seq"}
            onChange={(e) => { setSequence(e.target.value); }}
          />
        </div>
        <div>
          <label>Fibonacci</label>
          <input
            type='radio'
            id="fibonacci"
            name="sequence"
            value={"fib"}
            checked={sequence === "fib"}
            onChange={(e) => { setSequence(e.target.value); }}
          />
        </div>
        <div>
          <label>Square</label>
          <input
            type='radio'
            id="square"
            name="sequence"
            value={"squ"}
            checked={sequence === "squ"}
            onChange={(e) => { setSequence(e.target.value); }}
          />
        </div>
        <div>
          <label>Cubed</label>
          <input
            type='radio'
            id="cubed"
            name="sequence"
            value={"cub"}
            checked={sequence === "cub"}
            onChange={(e) => { setSequence(e.target.value); }}
          />
        </div>
        <div>
          <label>Binary</label>
          <input
            type='radio'
            id="binanry"
            name="sequence"
            value={"bin"}
            checked={sequence === "bin"}
            onChange={(e) => { setSequence(e.target.value); }}
          />
        </div>
        <div>
          <p>Include a Coffee card?: </p>

          <div>
            <label>Yes</label>
            <input
              type='radio'
              id="includeCoffee"
              name="includeCoffee"
              value={true}
              checked={includeCoffee}
              onChange={(e) => { setIncludeCoffee(e.target.value === 'true'); }}
            />
          </div>
          <div>
            <label>No</label>
            <input
              type='radio'
              id="excludeCoffee"
              name="includeCoffee"
              value={false}
              checked={includeCoffee === false}
              onChange={(e) => { setIncludeCoffee(e.target.value === 'true'); }}
            />
          </div>
        </div>
      </div>
        <div>

      <button
        type='submit'
        onClick={(e) => {
          e.preventDefault();
          updateBoard({
            numberOfCards,
            sequence,
            includeCoffee
          })

          closeModal()
        }}
      >
        Apply Changes to the board.
      </button>
      </div>
    </form>);
}

export default CardOptionForm
