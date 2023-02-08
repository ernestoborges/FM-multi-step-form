import './App.css'
import { MultiStepForm } from './components/MultiStepForm/MultiStepForm'
import { StepProvider } from './context/StepProvider'


function App() {

  return (
      <StepProvider>
        <div className="App">
          <main>
            <MultiStepForm />
          </main>
        </div>
      </StepProvider>
  )
}

export default App
