import React, { useState } from 'react';
import { AddItUp } from './AddItUp';



export const Adder = () => {

    const [operandA, setOperandA] = useState(null);
    const [operandB, setOperandB] = useState(null);



    

    return (
        <div class="container">
            <form>
                <div className="form-group has-success">
                    <label class="form-control-label" for="inputValid">Operand A</label>
                    <input type="number" class="form-control" required={true} value={operandA} onChange={ e=>  setOperandA(e.target.value) } />
                    <div class="valid-feedback">Thank you.</div>
                </div>
                <div className="form-group has-success">
                    <label class="form-control-label" for="inputValid">Operand B</label>
                    <input type="number" class="form-control"  required={true} value={operandB} onChange={ e => setOperandB(e.target.value) } />
                    <div class="valid-feedback">Thank you.</div>
                </div>
            </form>
            <div className="row">
                <div className="col-md-12 text-center">
                    <AddItUp a={operandA} b={operandB}></AddItUp>
                </div>
            </div>
        </div>
    );



}