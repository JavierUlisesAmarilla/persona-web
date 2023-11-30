'use client'

import {CommonModal} from '@/components/shared/common-modal'
import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}


export const DeployJsModal = ({
  show,
  onClose,
}: Props) => {
  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col w-full gap-3 p-6 text-xs'>
        <div className='p-2'>
          <strong>1.</strong> To deploy your Persona to a webapp, you’ll need your page to download our Persona web client from our server at&nbsp;
          <span className='text-blue-500'>
            https://api.sindarin.tech/PersonaClientPublic?apikey=[public-api-key]
          </span>
        </div>
        <CodeMirror
          className='p-2'
          theme='dark'
          editable={false}
          extensions={[javascript({jsx: true})]}
          value={`const script = document.createElement("script");
script.src = "https://api.sindarin.tech/PersonaClientPublic?apikey=<public-api-key>";`
          }
        />
        <div className='p-2'>
          <strong>2.</strong> Once the script loads, you must initialize the Persona Client using your public api key
        </div>
        <CodeMirror
          className='p-2'
          theme='dark'
          editable={false}
          extensions={[javascript({jsx: true})]}
          value={`script.addEventListener("load", async () => {
  console.log("persona client loaded");
  const apiKey = "<public-api-key>";
  const personaClient = new window.PersonaClient(apiKey);`
          }
        />
        <div className='p-2'>
          <strong>3.</strong> The Persona Client manages all audio streaming internally, so all you need to do is initialize it to begin speaking by calling
        </div>
        <CodeMirror
          className='p-2'
          theme='dark'
          editable={false}
          extensions={[javascript({jsx: true})]}
          value={`  personaClient.init(userId, personaName)`
          }
        />
        <div className='p-2'>
          <strong>4.</strong> Below is an example illustrating how the persona in our public AI pitch deck - a React app - is configured
        </div>
        <CodeMirror
          className='p-2'
          theme='dark'
          editable={false}
          extensions={[javascript({jsx: true})]}
          value={`import { useEffect, useState } from "react";

const pageDescriptions = {
  '1': // description of page 1 contents,
  '2': // description of page 2 contents,
  '3': // description of page 3 contents,
}

const PersonaClient = (props) => {
  const [personaClient, setPersonaClient] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [didSetListeners, setDidSetListeners] = useState(false);
  const [didStartPersona, setDidStartPersona] = useState(false);

  useEffect(() => {
    console.log("loading persona client");
    const script = document.createElement("script");
    script.src = "https://api.sindarin.tech/PersonaClientPublic?apikey=<public-api-key>";

    script.addEventListener("load", async () => {
      console.log("persona client loaded");
      const apiKey = "<public-api-key>";
      const personaClient = new window.PersonaClient(apiKey);
      setPersonaClient(personaClient);
    });
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (personaClient && isReady && !didSetListeners) {

      personaClient.on("connect_error", (error) => {});
      personaClient.on("disconnected", () => {});
      personaClient.on("json", ({ detail }) => {
        if (detail.gotoPage) {
          props.setCurPage([Number(detail.gotoPage)]);
          personaClient.updateState({
            pageDescription: pageDescriptions[detail.gotoPage] || '',
            currentPage: detail.gotoPage
          });
        }
        
        if (Object.keys(detail).includes("showEmail")) {
          if (detail.showEmail == 'true') {
            props.onShowEmail();
          } else {
            props.onHideEmail();
          }
        }

        if (detail.message_limit_reached) {
          props.onLimitReached();
        }
      });

      setDidSetListeners(true);
    }
  }, [personaClient, props.onLimitReached, isReady, didSetListeners]);

  // startPersona function
  useEffect(() => {
    const getUserID = async () => {
      // create a unique user id, used for limiting the conversation so users don't drain your tokens
    };

    if (personaClient && props.shouldStartPersona && !didStartPersona) {
      setDidStartPersona(true);
      const personaName = "<persona-name>";
      getUserID().then((userId) => {
        personaClient
        // John is a "DETAIL" that will be passed to your prompt as ***DETAILS.userName***
        .init(userId, personaName, {userName: "John"})
        .then(() => {
          personaClient.on("ready", () => {
            props.onReady();
            setIsReady(true);
          });
        })
        .catch((err) => {
          console.log("personaClient init error", err);
          if (/You have/gi.test(err)) {
            props.onLimitReached();
          }
        });
      });
    }
  }, [
    personaClient,
    props.shouldStartPersona,
    props.onReady,
    didStartPersona,
    props.onLimitReached,
  ]);
  
  return null; // or return UI elements if needed
};

export default PersonaClient`}
        />
      </div>
    </CommonModal>
  )
}
