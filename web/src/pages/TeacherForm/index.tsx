import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

function TeacherForm () {
  const history = useHistory();

  const [ values, setValues ] = useState({ 
    name: '', 
    avatar: '', 
    whatsapp: '',
    bio: '',
    subject: '',
    cost: '',
    schedule: [{ week_day: 0, from: '', to: '' }]
  });

  function addNewScheduleItem() {
    setValues ({
      ...values,
      schedule: [
        ...values.schedule,
        { week_day: 0, from: '', to: '' }
      ]
    });
  }

  function setScheduleItemValue(position: number, field: string, value: any) {
    const updatedSchedule = values.schedule.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setValues ({
      ...values,
      schedule: updatedSchedule
    });
  }

  function handleChange(e: any) {
    setValues({
      ...values,
      [e.target.getAttribute('name')]: e.target.value
    });
  }

  function handleCreateClass(e: any) {
     
    e.preventDefault();
    
    api.post('classes', {
      ...values,
      cost: Number(values.cost)
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      
      history.push('/');
    }).catch((err) => {
      console.log(err);
      alert('Erro no cadastro!');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={ handleCreateClass }>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo" 
              value={ values.name }
              onChange={ handleChange } />

            <Input 
              name="avatar" 
              label="Avatar"
              value={ values.avatar }
              onChange={ handleChange } />

            <Input 
              name="whatsapp" 
              label="WhatsApp"
              value={ values.whatsapp }
              onChange={ handleChange } />

            <Textarea 
              name="bio" 
              label="Biografia"
              value={ values.bio }
              onChange={ handleChange } />

          </fieldset>
  
          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              name="subject"
              label="Matéria"
              value={ values.subject }
              onChange={ handleChange }
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Física', label: 'Física' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Química', label: 'Química' },
                { value: 'Filosofia', label: 'Filosofia' },
                { value: 'Sociologia', label: 'Sociologia' },
                { value: 'Computação', label: 'Computação' }
              ]}
            />
            
            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={ values.cost }
              onChange={ handleChange }/>

          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            { values.schedule.map((scheduleItem, index) => {
              return (
                <div key={`${scheduleItem.week_day}${index}`} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={ scheduleItem.week_day }
                    onChange={e => setScheduleItemValue(index, 'week_day', Number(e.target.value))}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]}
                    required
                  />

                  <Input 
                    name="from" 
                    label="Das"
                    value={ scheduleItem.from }
                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                    type="time"
                    required />

                  <Input 
                    name="to" 
                    label="Até"
                    value={ scheduleItem.to }
                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                    type="time"
                    required />
                </div>
              );
            })}
            
          </fieldset>

          <footer>
            <p>
              <img src={ warningIcon } alt="Aviso importante"/>
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;