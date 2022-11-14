class SudokuSolver {
groupEntries(puzzleString){
  let puzzleGroup=[];
let array = puzzleString.split('');
  for(let i =1 ;i<=9; i++){

    let group = array.splice( 0, 9)
    puzzleGroup.push(group);

  }
return puzzleGroup;
}  

unGroupEntries(puzzle){
  let puzzleString = puzzle.reduce((a,b)=>a.concat(b))
  return puzzleString.join('');
}  
  validate(puzzleString) {
    if(puzzleString.length==81 && !/[^1-9\.]/.test(puzzleString)){return 'valid puzzle'}
  if(puzzleString.length!==81){return 'Expected puzzle to be 81 characters long'}
    if(/[^1-9\.]/.test(puzzleString)){return 'Invalid characters in puzzle'}
    
  }

  checkRowPlacement(puzzle, row, col, value) {
    puzzle[row][col] = '.';
     for(let d = 0; d < puzzle.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (puzzle[row][d] == value)
        {
            return false;
        }
    }
    puzzle[row][col] = value;
    return true;
 
  }

  checkColPlacement(puzzle, row, col, value) {
puzzle[row][col] = '.';
    
     for(let r = 0; r < puzzle.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (puzzle[r][col] == value)
        {
            return false;
        }
    }
    puzzle[row][col] = value;
    return true;
 
  }

  checkRegionPlacement(puzzle, row, col, value) {
    puzzle[row][col] = '.';
    let sqrt = Math.floor(Math.sqrt(puzzle.length));
    let regionRowStart = row - (row % sqrt);
    let regionColStart = col - (col % sqrt);
    for(let r = regionRowStart;
            r < regionRowStart + sqrt; r++)
    {
        for(let d = regionColStart;
                d < regionColStart + sqrt; d++)
        {
            if (puzzle[r][d] == value)
            {
                return false;
            }
        }
    }
    puzzle[row][col] = value;
    return true
  }

  solve(puzzleString) {

  let stuff = this.groupEntries(puzzleString)
let N = stuff.length;

  let result = this.solveSudoku(stuff, N)
    result = this.unGroupEntries(stuff)
    
    return result;
 
  }



isSafe(puzzle, row, column, value)
     {
       if(this.checkRowPlacement(puzzle, row, column, value)&&this.checkColPlacement(puzzle, row, column, value)&&this.checkRegionPlacement(puzzle, row, column, value)){
        
    return true;
     }
  return false;
}
 
solveSudoku(puzzle, n)
  {  
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (puzzle[i][j] == '.')
            {
                row = i;
                col = j;
 
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
 // No empty space left
    if (isEmpty)
    {
        return true;
  }
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (this.isSafe(puzzle, row, col, num))
        {
            puzzle[row][col] = `${num}`;
          
            if (this.solveSudoku(puzzle, n))
            {
                return true;
            }
            else
            {
                puzzle[row][col] = '.';
            }
        }
    }
    return false;
}
 
}
module.exports = SudokuSolver;

