import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import FormField from '../components/FormField';
import { money } from '../assets';
import {business } from '../assets'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 gap-10">
      {isLoading && <Loader />}
      <div className='sm:min-w-[380px]  rounded-[10px] m-auto'>
        <ul className="steps steps-horizontal">
          <li className="step step-warning">Register</li>
          <li className="step step-warning">Start Campaign</li>
          <li className="step">Purchase</li>
          <li className="step">Receive Product</li>
        </ul>
        </div> 
      {/* col item 1  */}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>
      {/* col item 2  */}
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[150px] m-auto">
          {/* label */}
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        
{/* label */}
        </div>
        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />
         
        
        <div className="w-full flex overflow-hidden justify-start items-center sm:flex-column p-4 bg-[#C35214] h-[250px] rounded-[10px]">
          <img src={business} alt="money" className="w-[200px] h-[200px] object-contain"/>
          <div>
          <h4 className="font-epilogue font-bold text-[25px] text-white m-auto">You will get 100% of the raised amount</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quos, corrupti repellendus, laboriosam ab architecto consequatur culpa tempore unde perferendis excepturi, harum libero voluptatum sit aut ea incidunt ipsam suscipit.</p>
          </div>
        </div>

                <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

      {/* col item 3 */}
      
      <input type="file" title='' className="file-input file-input-bordered file-input-warning w-full max-w-xs" />

          <div className="flex justify-center items-center mt-[40px]">
          <button className="btn sm:btn-sm md:btn-md lg:btn-md bg-[#ED9121] btn-glass text-white rounded-[10px]"
              
            >Submit new campaign</button>
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign