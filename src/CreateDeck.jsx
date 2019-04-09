import React, { useState } from 'react';
import { Card, Row, Col, Input, Layout, Button } from 'antd';

const { Header, Content } = Layout;

const emptyFlashcard = { term: '', definition: '' };

function CreateDeck(props) {
  const [title, setTitle] = useState('');
  const [flashcards, setFlashcards] = useState([
    emptyFlashcard,
    emptyFlashcard,
    emptyFlashcard
  ]);

  const [setOfFlashcards, addSetOfFlashcards] = useState([]);
  function handleFlashardChange({ name, value, index }) {
    const flashcardCopy = [
      ...flashcards.slice(0, index),
      { ...flashcards[index], [name]: value },
      ...flashcards.slice(index + 1)
    ];
    setFlashcards(flashcardCopy);
  }

  function addFlashcard() {
    setFlashcards([...flashcards, emptyFlashcard]);
  }

  function deleteFlashcard(index) {
    setFlashcards([
      ...flashcards.slice(0, index),
      ...flashcards.slice(index + 1)
    ]);
  }

  function createSetOfFlashcards() {
    addSetOfFlashcards([
      ...setOfFlashcards,
      {
        title,
        flashcards: flashcards.filter(
          ({ term, definition }) => term !== '' && definition !== ''
        )
      }
    ]);
    setFlashcards([emptyFlashcard, emptyFlashcard, emptyFlashcard]);
    setTitle('');
  }

  const hasAllEmptyFlashcards = !flashcards.some(
    ({ term, definition }) => term !== '' && definition !== ''
  );

  return (
    <Layout>
      <Header style={{ background: '#F0F2F5', margin: '0 16px', padding: 0 }}>
        <h2>
          All Sets
          <Button type="primary" shape="round" size="small" icon="plus-circle">
            Create Set
          </Button>
        </h2>
      </Header>
      <Header style={{ background: '#F0F2F5', margin: '0 16px', padding: 0 }}>
        <Input
          placeholder="Title of set"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </Header>
      <Content style={{ background: '#fff' }}>
        <div
          style={{
            padding: 24,
            paddingTop: 0,
            minHeight: 360
          }}
        >
          {flashcards.map(({ term, definition }, index) => (
            <Card key={index} style={{ background: '#F0F2F5', marginTop: 20 }}>
              <Input.Group>
                <Row gutter={4} justify="space-between" type="flex">
                  <Col span={11}>
                    <Input
                      name="term"
                      onChange={({ target: { name, value } }) =>
                        handleFlashardChange({ name, value, index })
                      }
                      placeholder="term"
                      value={term}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      name="definition"
                      onChange={({ target: { name, value } }) =>
                        handleFlashardChange({ name, value, index })
                      }
                      placeholder="definition"
                      value={definition}
                    />
                  </Col>
                  <Col span={1}>
                    <Button
                      disabled={flashcards.length === 1}
                      icon="delete"
                      onClick={() => deleteFlashcard(index)}
                    />
                  </Col>
                </Row>
              </Input.Group>
            </Card>
          ))}
          <Card style={{ background: '#F0F2F5', marginTop: 20 }}>
            <Row justify="center" type="flex">
              <Button icon="plus" onClick={addFlashcard} />
            </Row>
          </Card>
          <Button
            block
            onClick={createSetOfFlashcards}
            disabled={hasAllEmptyFlashcards || title === ''}
            style={{ marginTop: 20 }}
            type="primary"
          >
            CREATE
          </Button>
        </div>
        <div>
          {setOfFlashcards.map(({ title, flashcards }) => (
            <div>
              {title} {flashcards.length} terms
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
}

export default CreateDeck;
